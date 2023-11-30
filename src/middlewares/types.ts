import { validateSign } from './authValidation';
import { validatePostBody } from './postValidations';
import { validateUserBody, validateUserId } from './userValidation';

export type validateUserBody = typeof validateUserBody;
export type UserBodyContext = Parameters<validateUserBody>[0];

export type validateId = typeof validateUserId;
export type IdContextType = Parameters<validateId>[0];

export type validateSign = typeof validateSign;
export type SignContext = Parameters<validateSign>[0];

export type validatePostBody = typeof validatePostBody;
export type PostBodyContext = Parameters<validatePostBody>[0];
