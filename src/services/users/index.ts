import { UserDetail } from './users';
import { RequestOptions, request } from '@@/plugin-request/request';

export * from './users.d';

export function getCurrentUserDetail(opts?: RequestOptions) {
  return request<UserDetail>('/v1/users/me', {
    ...opts,
    method: 'GET',
  });
}
