import { SetMetadata } from '@nestjs/common';

export const MAPPED_META = 'mapped_meta';

export const MappedToMeta = (...type) => SetMetadata(MAPPED_META, type);
