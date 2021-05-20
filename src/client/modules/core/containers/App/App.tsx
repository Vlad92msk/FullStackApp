import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { makeCn } from '@shared/utils'
import styles from './App.module.scss'
import { Page } from '@shared/components/page'
import { Title } from '@shared/components/Title'
import { FieldRow } from '@shared/components/FieldRow'
import { Text } from '@shared/components/Text'
import { Line } from '@shared/components/Line'
import { Icon } from '@shared/components/Icon'
import { HoneycombMesh } from '~client/modules/core/components/HoneycombMesh'
import { IconName } from '~public/models/icon.model'
import { SpeedDial } from '@shared/components/SpeedDial/SpeedDial'
import { IconButton } from '@shared/components/IconButton'
import { createActions } from '@shared/utils/createApolloActions'
import { useQuery } from '@apollo/client'
import { appQueries } from '~client/modules/core/graphql/queries'
import { SkillsQueryModel } from '~client/modules/core/types/appQueryModel'
import { Modal, ModalBody, ModalHeader } from '@shared/components/Modal'
import ReactTooltip from 'react-tooltip'
import { SignInForm } from '~client/modules/core/containers/SignInForm'

const cn = makeCn('App', styles)

export type SpecialtyType = 'backend' | 'frontend' | 'other'

export const App: React.FC = () => {
  const { data: { findAllSkills = [] } = {}, loading: findAllLoading, error: findAllError } = useQuery<SkillsQueryModel>(appQueries.FIND_SKILLS)

  const [specialty, setSpecialty] = useState<SpecialtyType>('other')
  const [signIn, setSignIn] = useState(true)

  const handleChangeSkillFrontend = useCallback(() => setSpecialty('frontend'), [])
  const handleChangeSkillBackend = useCallback(() => setSpecialty('backend'), [])
  const handleChangeSkillOther = useCallback(() => setSpecialty('other'), [])
  const handleChangeSignIn = useCallback(() => setSignIn((prev) => !prev), [])

  const el = useCallback(
    (icon: IconName, spec?: SpecialtyType) => (
      <Icon
        icon={icon}
        fill={'light100'}
        className={cn('IconSkill', spec && { active: specialty === spec })}
        onMouseEnter={spec === 'frontend' ? handleChangeSkillFrontend : spec === 'backend' ? handleChangeSkillBackend : handleChangeSkillOther}
        onMouseLeave={handleChangeSkillOther}
      />
    ),
    [specialty]
  )

  const meshProjects = useMemo(
    () => (
      <HoneycombMesh
        className={cn('Mesh')}
        row={2}
        column={2}
        othersElements={el('honeycomb')}
        userElements={[
          {
            position: 1,
            element: el('projects-button'),
          },
          {
            position: 2,
            element: el('cosmo-button'),
          },
        ]}
      />
    ),
    [el]
  )

  const meshSkills = useMemo(
    () => (
      <HoneycombMesh
        className={cn('Mesh')}
        othersElements={el('honeycomb')}
        userElements={[
          ...findAllSkills.map(({ position, specialty, name }) => ({
            position,
            element: el(name, specialty),
          })),
          {
            position: 11,
            element: (
              <svg className={cn('IconSkillButton')} style={{ position: 'relative' }}>
                <Icon
                  icon={'frontend'}
                  fill={'light100'}
                  className={cn('IconSkill')}
                  onMouseEnter={handleChangeSkillFrontend}
                  onMouseLeave={handleChangeSkillOther}
                />
                <Icon
                  icon={'backend'}
                  fill={'light100'}
                  className={cn('IconSkill')}
                  onMouseEnter={handleChangeSkillBackend}
                  onMouseLeave={handleChangeSkillOther}
                />
              </svg>
            ),
          },
        ]}
      />
    ),
    [el, findAllSkills]
  )

  if (findAllLoading) {
    return <div>Loading</div>
  }
  if (findAllError) {
    return <div>{findAllError.message}</div>
  }

  return (
    <Page>
      <div className={cn()}>
        <div className={cn('Menu')}>
          <SpeedDial
            buttonClassname={cn('MenuButton')}
            icon={'share'}
            direction={'left'}
            size={'medium'}
            elements={[
              <>
                <IconButton className={cn('MenuItem')} icon={'sign-in'} onClick={handleChangeSignIn} data-for="sign-in" data-tip />
                <ReactTooltip id={'sign-in'} type={'dark'} place={'bottom'}>
                  Войти
                </ReactTooltip>
              </>,
              <>
                <IconButton className={cn('MenuItem')} icon={'settings-2'} data-for="settings" data-tip />
                <ReactTooltip id={'settings'} type={'dark'} place={'bottom'}>
                  Настройки
                </ReactTooltip>
              </>,
              <>
                <IconButton key={3} className={cn('MenuItem')} icon={'info-2'} data-for="info" data-tip />
                <ReactTooltip id={'info'} type={'dark'} place={'bottom'}>
                  Информация
                </ReactTooltip>
              </>,
              <>
                <IconButton className={cn('MenuItem')} icon={'message-square'} data-for="message" data-tip />
                <ReactTooltip id={'message'} type={'dark'} place={'bottom'}>
                  Сообщение
                </ReactTooltip>
              </>,
            ]}
          />
        </div>
        <FieldRow className={cn('LeftBlock')} direction={'column'}>
          <FieldRow className={cn('Info')} width={'100'} direction={'column'}>
            <Title className={cn('Title')} size={'1'}>
              Фирсов Влад
            </Title>
            <Text color={'title'}>тел: 4646-465-54</Text>
            <Line />
            <FieldRow className={cn('InfoBlock')} wrap={'wrap'} width={'100'}>
              <FieldRow className={cn('InfoRow')} width={'100'}>
                <FieldRow width={'50'}>
                  <Text color={'body'}>Возраст</Text>
                </FieldRow>
                <FieldRow width={'50'}>
                  <Text color={'body'}>28 лет</Text>
                </FieldRow>
              </FieldRow>
              <FieldRow className={cn('InfoRow')} width={'100'}>
                <FieldRow width={'50'}>
                  <Text color={'body'}>Специальность</Text>
                </FieldRow>
                <FieldRow width={'50'}>
                  <Text color={'body'}>Frontend-разработчик</Text>
                </FieldRow>
              </FieldRow>
              <FieldRow className={cn('InfoRow')} width={'100'}>
                <FieldRow width={'50'}>
                  <Text color={'body'}>Стаж</Text>
                </FieldRow>
                <FieldRow width={'50'}>
                  <Text color={'body'}>1 год</Text>
                </FieldRow>
              </FieldRow>
            </FieldRow>
          </FieldRow>
          <FieldRow className={cn('ProjectsContainer')} width={'100'} justify={'center'}>
            <div className={cn('PaddingBox')}>{meshProjects}</div>
          </FieldRow>
        </FieldRow>
        <FieldRow className={cn('RightBlock')} direction={'column'} align={'center'}>
          <Title className={cn('Title')} size={'1'}>
            Технологии
          </Title>
          <FieldRow className={cn('Skills')} justify={'center'} wrap={'wrap'}>
            <div className={cn('PaddingBox')}>{meshSkills}</div>
          </FieldRow>
          <FieldRow className={cn('SpecialtyText')} width={'100'} justify={'end'}>
            <Text color={'body'} size={'extraLarge'} textTransform={'uppercase'}>
              {specialty}
            </Text>
          </FieldRow>
        </FieldRow>
        <div className={cn('PersonContainer')}>
          <div className={cn('Person')} />
        </div>
      </div>

      <Modal open={signIn} size={'medium'} onClose={handleChangeSignIn}>
        {() => (
          <>
            <ModalHeader title={'Войти'} titlePosition={'center'} />
            <ModalBody>
              <SignInForm />
            </ModalBody>
          </>
        )}
      </Modal>
    </Page>
  )
}

export const getServerSideProps = (): Promise<unknown> =>
  createActions({
    queries: [{ query: appQueries.FIND_SKILLS }],
  })