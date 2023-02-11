import { SetMetadata } from '@nestjs/common';

export const MAPPED_TO_TYPE = 'return-type';

export const MappedToType = (...type) => SetMetadata(MAPPED_TO_TYPE, type);
