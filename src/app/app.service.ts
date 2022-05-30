import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, of } from 'rxjs';
import { Data, DataItem, Item } from './data.interface';
import { data } from './data';

const USE_CACHE = true;

@Injectable({ providedIn: 'root' })
export class AppService {

  private favorites: string[] = [];

  constructor(private httpClient: HttpClient) {
    this.fetchFavorites();
  }

  async fetchData(): Promise<Item[]> {
    if (USE_CACHE) {
      return data.map(item => {
        item.favorite = this.isFavorite(item.id);
        return item;
      });
    }
    let cachedItems = JSON.parse(localStorage.getItem('nerdland-items') || '[]') as Item[];
    let result = await this.fetchPart('api/programma-item?format=json');
    if (result === false) {
      console.error(`Fetch data failed. Use cache. contains ${cachedItems.length} items`);
    } else {
      let dataItems: DataItem[] | null = [...result.items];
      while (result !== false && result.pagination.nextPageUrl) {
        result = await this.fetchPart(`api${result.pagination.nextPageUrl}&format=json`);
        if (result === false) {
          dataItems = null;
          console.error(`Fetch data failed. Use cache. contains ${cachedItems.length} items`);
        } else if (dataItems){
          dataItems.push(...result.items);
        }
      }
      const items = dataItems && this.mapData(dataItems) || cachedItems;
      console.log(`items string length: ${JSON.stringify(items).length}`);
      localStorage.setItem('nerdland-items', JSON.stringify(items));
      console.log(items);
      return items;
    }
    return cachedItems;
  }

  async fetchPart(url: string): Promise<Data | false> {
    // return lastValueFrom(this.httpClient.get<Data>(`${url}&xxx=${Date.now()}`).pipe(
    return lastValueFrom(this.httpClient.get<Data>(`${url}`).pipe(
      catchError((err) => {
        return of(false as false);
      })
    ));
  }

  private mapData(dataItems: DataItem[]): Item[] {
    // @ts-ignore
    const items: Item[] = dataItems.map(dataItem => {
      const item: Item = {
        id: dataItem.id,
        title: dataItem.title,
        urlId: dataItem.urlId,
        childFriendly: false,
        description: '',
        favorite: false,
        forWho: '',
        friday: false,
        saturday: false,
        sunday: false,
        when: '',
        where: ''
      };
      let match = /<h3><em>([^<]+)<\/em><strong>([^<]+)<\/strong><em>([^<]+)<\/em><\/h3><h3>#?<a[^<]+<\/a><\/h3>(?:<p[^>]+>(.*)<\/p>)?<p[^>]+><em>(.*)<\/em><\/p>/.exec(dataItem.excerpt);
      if (match) {
        item.type = match[1];
        const day = match[2];
        item.time = match[3];
        item.childFriendly = !!match[4];
        item.tent = match[5];
        item.favorite = this.isFavorite(item.id);
        if (day) {
          item.friday = day.indexOf('vr') >= 0;
          item.saturday = day.indexOf('za') >= 0;
          item.sunday = day.indexOf('zo') >= 0;
        }

        match = /<noscript><img.+alt="(.+)"\sloading.+<\/noscript>/.exec(dataItem.body);
        if (match) {
          const text = match[1];
          match = /[^-]+- (.+)WANNEER:(.+)WAAR:(.+)VOOR:(.+)/.exec(text);
          if (match) {
            item.description = match[1];
            item.when = match[2].trim();
            item.where = match[3].trim();
            item.forWho = match[4].trim();
          } else {
            debugger;
          }
        } else {
          debugger;
        }
        dataItem.body = '';
        return item;
      } else {
        console.log(dataItem.excerpt);
        return null;
      }
    }).filter(item => item);
    return items;
  }

  private fetchFavorites(): void {
    const result = localStorage.getItem('nerdland-favorites');
    if (result) {
      this.favorites = JSON.parse(result);
    }
  }

  addToFavorites(id: string): boolean {
    if (this.favorites.indexOf(id) < 0) {
      this.favorites.push(id);
      localStorage.setItem('nerdland-favorites', JSON.stringify(this.favorites));
      return true;
    }
    return false;
  }

  removeFromFavorites(id: string): boolean {
    const index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      localStorage.setItem('nerdland-favorites', JSON.stringify(this.favorites));
      return true;
    }
    return false;
  }

  private isFavorite(id: string): boolean {
    return this.favorites.indexOf(id) >= 0;
  }

  toggleFavorite(item: Item) {
    if (this.isFavorite(item.id)) {
      this.removeFromFavorites(item.id);
      item.favorite = false;
    } else {
      this.addToFavorites(item.id);
      item.favorite = true;
    }
  }
}
