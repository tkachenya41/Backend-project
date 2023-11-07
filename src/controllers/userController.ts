import userRepository from '@/repositories/userRepository';

export const user = {
  getById: userRepository.getById,

  getAll: userRepository.getAll,

  post: userRepository.post,

  put: userRepository.put,

  delete: userRepository.delete,
};
