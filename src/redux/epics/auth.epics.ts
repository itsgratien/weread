import { RootEpic } from '.';
import { AuthTypes, setMessage } from '..';
import { map, filter } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

export const welcomeEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(AuthTypes.Welcome)),
    map(() => setMessage('welcome to our app'))
  );
};
