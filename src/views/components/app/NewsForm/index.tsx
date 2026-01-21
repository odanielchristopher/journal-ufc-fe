import { Controller } from 'react-hook-form';

import { CategoryDataMapper } from '@app/datamappers/CategoryDataMapper';
import type { Category } from '@app/enums/Category';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import { Textarea } from '@views/components/ui/Textarea';

import { CategoryDropdown } from '../CategoryDropdown';

import {
  useNewsFormController,
  type IUseNewsFormController,
} from './useNewsFormController';

interface NewsFormProps extends IUseNewsFormController {
  isLoading?: boolean;
  buttonLabel: string;
}

export function NewsForm({ isLoading, buttonLabel, ...props }: NewsFormProps) {
  const { formState, form, handleSubmit, register } =
    useNewsFormController(props);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        className="bg-white"
        placeholder="Título*"
        error={formState.errors.title?.message}
        {...register('title')}
      />

      <Textarea
        className="bg-white"
        placeholder="Digite um breve resumo da postagem*"
        error={formState.errors.description?.message}
        {...register('description')}
      />

      <Textarea
        className="bg-white"
        placeholder="Digite o conteúdo da postagem*"
        error={formState.errors.content?.message}
        {...register('content')}
      />

      <Input
        className="bg-white"
        placeholder="URL da imagem*"
        error={formState.errors.imageUrl?.message}
        {...register('imageUrl')}
      />

      <Controller
        control={form.control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <CategoryDropdown
            isFilter={false}
            className="h-12 w-full! bg-white hover:bg-white"
            value={value}
            enumObj={{
              DESTAQUE: 'DESTAQUE',
              EXTENSAO: 'EXTENSAO',
              PESQUISA: 'PESQUISA',
              COMUNIDADE: 'COMUNIDADE',
            }}
            labelMapper={(cat) => CategoryDataMapper.toDomain(cat as Category)}
            placeholder="Selecione uma categoria*"
            onValueChange={onChange}
            error={formState.errors.category?.message}
          />
        )}
      />

      <Button
        type="submit"
        className="mt-4 w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
