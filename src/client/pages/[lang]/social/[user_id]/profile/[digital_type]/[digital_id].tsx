import { GetServerSideProps, NextPage } from 'next'
import { Page } from '@client/shared/components/page'
import { ssrResult, getSSR } from '@client/shared/utils/getSsrFuncs'
import { Section } from '@client/shared/components/Section'
import { PHOTO_ITEMS } from '@client/projects/social/containers/Profile/data/photoItems.data'
import { VIDEO_ITEMS } from '@client/projects/social/containers/Profile/data/videoItems.data'
import { DigitalCardType, DigitalPage } from '@client/projects/social/containers/Profile/components'


interface DigitalCardProps {
  data: any
}

const DigitalCard: NextPage<DigitalCardProps> = (props) => {
  const { data } = props
  return (
    <Page subTitle={'Ssss'}>
      <Section>
        <DigitalPage data={data} userId={1} />
      </Section>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = (ctx) => getSSR(ctx, async (apolloClient) => {
  const id = ctx.query.digital_id
  const type = ctx.query.digital_type as DigitalCardType

  switch (type) {
    case DigitalCardType.PHOTO:
      return ssrResult(apolloClient, {
        data: JSON.parse(JSON.stringify(PHOTO_ITEMS.find(({ id: photoId }) => photoId === Number(id)))),
        elementId: id
      })
    case DigitalCardType.VIDEO:
      return ssrResult(apolloClient, {
        data: JSON.parse(JSON.stringify(VIDEO_ITEMS.find(({ id: photoId }) => photoId === Number(id)))),
        elementId: id
      })
    default:
      return ssrResult(apolloClient, {
        data: {},
        elementId: null
      })
  }
})

export default DigitalCard
