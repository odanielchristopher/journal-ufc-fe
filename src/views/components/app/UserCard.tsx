import { Pencil, Trash2, UserIcon } from "lucide-react";
import type { IUser } from "@app/entities/User";
import { Button } from "@views/components/ui/Button";
import { capitalizeFirstLetter } from "@app/utils/capitalizeFirstLetter";

type EditUserCardProps = {
  user: IUser;
  onEdit(): void;
  onRemove(): void;
  variant: "edit";
};

type NormalUserCardProps = {
  user: IUser;
  variant?: "default";
  className?: string;
};

export type UserCardProps = NormalUserCardProps | EditUserCardProps;

// Helper para cores das categorias
const getCategoryColor = (category: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    ADMIN: {
      bg: 'bg-green-100', // Verde para ADMIN
      text: 'text-green-700',
    },
    EDITOR: {
      bg: 'bg-yellow-100', // Amarelo para EDITOR
      text: 'text-yellow-700',
    },
  };

  return colors[category] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  };
};

export function UserCard(props: UserCardProps) {
  if (props.variant === "edit") return <EditUserCard {...props} />;
  return <DefaultUserCard {...props} />;
}

function DefaultUserCard({ user, className }: NormalUserCardProps) {
  const categoryColors = getCategoryColor(user.category);

  return (
    <div
      className={`flex w-full min-w-0 flex-wrap sm:flex-nowrap items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
        <UserIcon className="size-5 text-gray-600" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-base leading-snug font-semibold">{user.name}</h3>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {user.email}
        </p>
        
        {/* Badge da categoria */}
        <span className={`w-fit rounded-full ${categoryColors.bg} ${categoryColors.text} px-3 py-0.5 text-xs font-medium mt-1`}>
          {capitalizeFirstLetter(user.category.toLowerCase())}
        </span>
      </div>
    </div>
  );
}

function EditUserCard({ user, onEdit, onRemove }: EditUserCardProps) {
  const categoryColors = getCategoryColor(user.category);

  return (
    <div className="flex w-full min-w-0 flex-wrap sm:flex-nowrap items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50">
      <div className="flex h-24 w-40 items-center justify-center rounded-md bg-gray-100">
        <UserIcon className="size-10 text-gray-600" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-base leading-snug font-semibold">{user.name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {user.email}
        </p>
        
        <span className={`w-fit rounded-full ${categoryColors.bg} ${categoryColors.text} px-3 py-0.5 text-xs font-medium mt-1`}>
          {capitalizeFirstLetter(user.category.toLowerCase())}
        </span>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="ghost" size="icon" onClick={onEdit}>
          <Pencil className="size-4" />
        </Button>

        <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}