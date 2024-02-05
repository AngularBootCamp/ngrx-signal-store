import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { WorkTask, WorkTaskLoader } from './work-task-loader.service';

export interface WorkTaskState {
  todoWork: string[];
  doneWork: string[];
}

export const WorkTaskStore = signalStore(
  { providedIn: 'root' },
  withState<WorkTaskState>({ doneWork: [], todoWork: [] }),
  withMethods(state => {
    const { doneWork, todoWork } = state;
    const loader = inject(WorkTaskLoader);

    return {
      setWorkState(task: string, complete: boolean) {
        patchState(
          state,
          setWorkTaskStatus(todoWork(), doneWork(), task, complete)
        );
      },
      completeAll() {
        patchState(state, {
          doneWork: [...doneWork(), ...todoWork()],
          todoWork: []
        });
      },
      load: rxMethod<void>(
        pipe(
          switchMap(() => {
            return loader.getList().pipe(
              map(tasks => ({
                doneWork: tasks.slice(0, 4).map(toTask),
                todoWork: tasks.slice(4, 6).map(toTask)
              })),
              catchError(error => {
                console.error('Could not load work tasks', error);
                window.alert('Could not load work tasks');
                return of({ doneWork: [], todoWork: [] });
              }),
              tap((tasks: WorkTaskState) => patchState(state, tasks))
            );
          })
        )
      )
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    }
  })
);

function toTask(task: WorkTask) {
  return task.title;
}

function setWorkTaskStatus(
  oldTodoWork: string[],
  oldDoneWork: string[],
  task: string,
  complete: boolean
): WorkTaskState {
  const todoWork = oldTodoWork.filter(x => x !== task);
  const doneWork = oldDoneWork.filter(x => x !== task);
  if (complete) {
    todoWork.push(task);
  } else {
    doneWork.push(task);
  }
  return { todoWork, doneWork };
}
