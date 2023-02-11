type ResponsePaginationType<T> =
  | [T[], number]
  | {
      data: T[];
      count: number;
    };

export default ResponsePaginationType;
