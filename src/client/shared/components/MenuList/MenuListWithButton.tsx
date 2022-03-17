import React, { useCallback, useState } from 'react';
import { Box } from 'react-polymorphic-box';
import { PopperPlacementType } from '@material-ui/core'
import { classnames } from '@bem-react/classnames';

import { MenuList } from '@client_shared/components/MenuList/MenuList'
import { Icon } from '@client_shared/components/Icon'
import { cn } from './cn';

export interface MenuListWithButtonProps {
  className?: string;
  classNameButton?: string;
  children: React.ReactNode | React.ReactNode[];
  button?: React.ReactNode | React.ReactNode[] | React.FunctionComponent<{ handleClick: (event: React.MouseEvent<HTMLElement>) => void }>;
  position?: PopperPlacementType;
  offset?: string;
}


export const MenuListWithButton: React.FC<MenuListWithButtonProps> = (props) => {
  const {
    children, button, classNameButton, ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback(({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      {
        typeof button === 'function' ? (
          button({ handleClick })
        ) : (
          <Box as="button" className={classnames(cn('MenuButton'), classNameButton)} onClick={handleClick}>
            {button || <Icon icon="more-horizontal" className={cn('ButtonIcon')} />}
          </Box>
        )
      }
      <MenuList anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose} {...rest}>
        {children}
      </MenuList>
    </>
  );
};

MenuListWithButton.defaultProps = {
  classNameButton: null,
};
