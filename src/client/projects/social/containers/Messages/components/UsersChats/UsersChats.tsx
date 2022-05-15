import React, { useMemo } from 'react'
import lodash from 'lodash'

import { Friend } from '@client/projects/social/containers/Messages/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { ALL_USERS } from '@client/projects/social/containers/UserMenu/data/all_users'
import { useMessageServiceValue } from '../../service/MessageService'
import styles from './UsersChats.module.scss'


const cn = makeCn('UsersChats', styles)

type UsersChatsProps = {}
export const UsersChats: React.FC<UsersChatsProps> = React.memo((props) => {
  const openFolderId = useMessageServiceValue('openFolderId')
  const folders = useMessageServiceValue('folders')
  const search = useMessageServiceValue('search')

  const allFriends = useMemo(() => lodash.uniq(Object.values(folders).map(({ friends }) => friends).flat()), [folders])
  const allNoFriends = useMemo(() => lodash.uniq(Object.values(folders).map(({ noFriends }) => noFriends).flat()), [folders])

  /**
   * Если папка выбрана - показываем чаты из нее, если нет - все чаты
   */
  const friends = useMemo(() => folders && lodash(openFolderId ? folders[openFolderId].friends : allFriends)
    .map((id) => ALL_USERS.find(({ id: userId }) => userId === id))
    .filter(({ name, family }) => `${name + family}`.includes(search))
    .value(),
    [folders, openFolderId, allFriends, search])

  const noFriends = useMemo(() => lodash(ALL_USERS)
    .filter(({ id }) => allNoFriends.includes(id))
    .value(),
    [allNoFriends])

  return (
    <div className={cn()}>
      {
        Boolean(friends.length) && (
          <>
            <Text className={cn('Title')} children={openFolderId ? 'Чаты с друзьями' : 'Все чаты'} size={'1'} />
            {friends.map((friend) => (
              <Friend key={friend.id} friend={friend} />
            ))}
          </>
        )}
      {Boolean(noFriends.length) && (
        <>
          <Text className={cn('Title')} children={'Чаты не с друзьями'} size={'1'} />
          {noFriends.map((friend) => (
            <Friend key={friend.id} friend={friend} />
          ))}
        </>
      )}
    </div>
  )
})
