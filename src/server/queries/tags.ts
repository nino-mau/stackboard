import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import { TagService } from '../services/tagService';

export const tagsQueryOptions = () =>
  queryOptions({
    queryKey: ['tags'],
    queryFn: () => fetchTags(),
  });

export const fetchTags = createServerFn({ method: 'GET' }).handler(async () => {
  const tags = await TagService.getAll();
  return tags;
});
