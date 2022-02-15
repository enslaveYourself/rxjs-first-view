import {debounceTime, distinctUntilChanged, map, Observable} from "rxjs";

const search$ = new Observable<Event>(observer => {
  const search = document.getElementById('search');

  search.addEventListener('input', event => {
    observer.next(event);
  });

  if (!search) {
    observer.error('Element does not exist on the page.)');
    return;
  }

});

search$
  .pipe(
    map(event => {
      return (event.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map(value => value.length > 3 ? value : ''),
    distinctUntilChanged())
  .subscribe(value => {
    console.log(value);
  });


