import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appJoin',
  standalone: true,
})
export class JoinPipe implements PipeTransform {
  transform(array: string[], separator = ''): string {
    return array.join(separator);
  }
}
