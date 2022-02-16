import pandas as pd
import argparse
import os.path
import time

ACTIONS_COLUMNS = ['id', 'session_id', 'target_id', 'action_type', 'details', 'performed_time']
SESSIONS_COLUMNS = ['id', 'session_id', 'tone_condition', 'start_time', 'exit_time']
SUMMARY_COLUMNS = ['user_id', 'old_time_spent', 'new_time_spent', 'tone_condition',
        'suggestion_delete_post', 'suggestion_edit_post', 'suggestion_change_audience',
        'action_delete', 'action_edit_post', 'action_change_audience',
        'total_actions', 'posts_interacted_with']

def open_csv_file(parser, columns, arg):
    if not os.path.exists(arg):
        parser.error("The file %s does not exist!" % arg)
    else:
        return pd.read_csv(arg, names=columns)

def make_argument_parser():
    parser = argparse.ArgumentParser(description='Preprocess data from the Friendbook study.')
    parser.add_argument('--actions', dest='actions', required=True,
                    help='csv file with user actions', metavar='FILE',
                    type=lambda x: open_csv_file(parser, ACTIONS_COLUMNS, x))
    parser.add_argument('--sessions', dest='sessions', required=True,
                    help='csv file with user sessions', metavar='FILE',
                    type=lambda x: open_csv_file(parser, SESSIONS_COLUMNS, x))
    parser.add_argument('--output', dest='output', required=True,
                    help='filename of csv output file', metavar='FILE',
                    type=str)
    return parser

def parse_timestamp(ts):
    return time.strptime(ts.split('+')[0], '%Y-%m-%d %H:%M:%S.%f')

def get_user_session(sessions_df, session_id):
    user_sessions = sessions_df[sessions_df['session_id'] == session_id]
    if len(user_sessions) == 0:
        print("warning: user with session_id %s not found in sessions table" % session_id)
        return None
    return user_sessions.iloc[0]

def make_action_summary_row(session_id, user_session, actions):
    new_row = {'user_id': session_id}

    # Time spent is taken to be time difference between the first and
    # last entries in the actions table
    # This includes suggestions being accepted, rejected, or just appearing
    times = [parse_timestamp(ts) for ts in actions['performed_time']]
    time_start, time_end  = min(times), max(times)
    new_row['old_time_spent'] = int(time.mktime(time_end) - time.mktime(time_start))

    # The user's tone condition comes from the sessions table
    new_row['tone_condition'] = user_session['tone_condition']
    if not pd.isna(user_session['start_time']) and not pd.isna(user_session['exit_time']):
        new_exit_time = time.mktime(parse_timestamp(user_session['exit_time']))
        new_start_time = time.mktime(parse_timestamp(user_session['start_time']))
        new_row['new_time_spent'] = int(new_exit_time - new_start_time)

    # For each type of suggestion, search for either acceptance or rejection
    # 1=Accept, -1=Reject, 0=Ignore or not seen
    for action_type in ['delete_post', 'edit_post', 'change_audience']:
        prefix = f"suggestion_{action_type}"
        if any(actions['target_id'].str.contains(prefix + '_accept', case=False)):
            new_row[prefix] = 1
        elif any(actions['target_id'].str.contains(prefix + '_reject', case=False)):
            new_row[prefix] = -1
        else:
            new_row[prefix] = 0

    # Seach for any actions of each type, for each post
    # Duplicate actions (like diting a post twice) are only counted once
    # Thus, each of thse columns will have a value from 0 to 10
    action_delete, action_edit_post, action_change_audience = 0, 0, 0
    for post_i in range(1, 11):
        post_actions = actions[actions['target_id'] == f"p{post_i}"]

        deleted = any(post_actions['action_type'] == 'delete')
        edited = any(post_actions['action_type'] == 'edit')
        changed_audience = any(post_actions['action_type'] == 'change_audience')

        # Posts interacted with is incremented if any action has been taken
        if 'posts_interacted_with' in new_row:
            new_row['posts_interacted_with'] += deleted or edited or changed_audience
        else:
            new_row['posts_interacted_with'] = deleted or edited or changed_audience

        action_delete += deleted
        action_edit_post += edited
        action_change_audience += changed_audience
    new_row['action_delete'] = action_delete
    new_row['action_edit_post'] = action_edit_post
    new_row['action_change_audience'] = action_change_audience

    # Total actions is the sum of the other three
    # It has a value from 0 to 30
    new_row['total_actions'] = action_delete + action_edit_post + action_change_audience

    return new_row

def main():
    # Consume command line arguments
    args = make_argument_parser().parse_args()
    actions_df = args.actions
    sessions_df = args.sessions

    # Initialize the summary dataframe
    action_summary_df = pd.DataFrame(columns=SUMMARY_COLUMNS)

    # Output a row for each table, for each user
    for session_id, actions in actions_df.groupby('session_id'):
        user_session = get_user_session(sessions_df, session_id)
        if user_session is None:
            continue

        action_summary_row = make_action_summary_row(session_id, user_session, actions)
        action_summary_df = action_summary_df.append(action_summary_row, ignore_index=True)

    action_summary_df.to_csv(args.output, index=False)

if __name__=="__main__":
    main()
