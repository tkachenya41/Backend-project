import { validateSign } from './authValidation';
import { validateUserBody, validateUserId } from './userValidation';

export type validateBody = typeof validateUserBody;
export type BodyContextType = Parameters<validateBody>[0];
export type validateId = typeof validateUserId;
export type IdContextType = Parameters<validateId>[0];
export type validateSign = typeof validateSign;
export type SignContextType = Parameters<validateSign>[0];
