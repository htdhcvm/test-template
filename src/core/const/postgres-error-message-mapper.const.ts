import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import PostgresActionCodeEnum from '../enum/postgres-action-code.enum';

const PostgresErrorMessageMapper = {
  [PostgresActionCodeEnum.ForeignKeyViolation]: {
    message: 'Update or delete violates foreign key constraint',
    status: HttpStatus.CONFLICT,
    type: ConflictException.name,
  },
  [PostgresActionCodeEnum.UniqueViolation]: {
    message: 'Duplicate key value unique constrain',
    status: HttpStatus.CONFLICT,
    type: ConflictException.name,
  },
  [PostgresActionCodeEnum.ForeignKeyViolation]: {
    message: 'Insert or update violates foreign key constraint',
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException.name,
  },
  [PostgresActionCodeEnum.CaseNotFound]: {
    message: 'Case not found',
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException.name,
  },
};

export default PostgresErrorMessageMapper;
