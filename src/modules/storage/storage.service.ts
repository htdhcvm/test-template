import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export default class StorageService<T> extends AsyncLocalStorage<T> {}
