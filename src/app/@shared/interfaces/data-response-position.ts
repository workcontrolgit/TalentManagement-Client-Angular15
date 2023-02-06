import { Position } from '@app/@shared/interfaces/position';

export interface DataResponsePosition {
  succeeded: boolean;
  message: string;
  errors: string;
  data: Position;
}
