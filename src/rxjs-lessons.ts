import {debounceTime, distinctUntilChanged, fromEvent, map, Observable, takeUntil} from "rxjs";

/*const search$ = new Observable<Event>(observer => {
  const search = document.getElementById('search');
  const stop = document.getElementById('stop');

  if (!search || !stop) {
    observer.error('Element does not exist on the page.)');
    return;
  }

  const onSearch = event => {
    console.log(123);
    checkSubscription();
    observer.next(event);
  };

  const onStop = event => {
    checkSubscription();
    observer.complete();
    clear();
  }

  search.addEventListener('input', onSearch);
  stop.addEventListener('click', onStop);

  const checkSubscription = () => {
    if (observer.closed) {
      clear();
    }
  }
  const clear = () => {
    search.removeEventListener('input', onSearch);
    stop.removeEventListener('click', onSearch);
  }
});*/

const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search'),
  'input'
);

const stop$: Observable<Event> = fromEvent<Event>(
  document.getElementById('stop'),
  'click'
);

search$
  .pipe(
    map(event => {
      return (event.target as HTMLInputElement).value;
    }),
    debounceTime(700),
    map(value => value.length > 3 ? value : ''),
    distinctUntilChanged(),
    takeUntil(stop$))
  .subscribe(value => {
    console.log('Printing')
    console.log(value);
  });
