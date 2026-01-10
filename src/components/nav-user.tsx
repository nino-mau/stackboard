'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import type { User } from '@/types/user';
import { getInitials } from '@/utils/misc';
import {
  CheckmarkBadge01Icon,
  CreditCardIcon,
  Logout01Icon,
  Settings01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from './ui/item';

export function NavUser({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="hover:bg-transparent"
        render={
          <SidebarMenuButton
            size="default"
            className="p-0 hover:ring-4 hover:ring-accent"
          />
        }
      >
        <Avatar className="rounded-lg">
          {/* Render avatar if image exist */}
          {user.image && (
            <AvatarImage
              className="rounded-lg"
              src={user.image}
              alt={user.name}
            />
          )}
          <AvatarFallback className="rounded-lg">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <Item size="xs">
              <ItemMedia>
                <Avatar className="rounded-lg">
                  {user.image && (
                    <AvatarImage
                      src={user.image}
                      alt={user.name}
                      className="rounded-lg"
                    />
                  )}
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-foreground">{user.name}</ItemTitle>
                <ItemDescription> {user.email}</ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HugeiconsIcon icon={CheckmarkBadge01Icon} />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={CreditCardIcon} />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Settings01Icon} />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Logout01Icon} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
