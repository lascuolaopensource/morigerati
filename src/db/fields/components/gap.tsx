import exp from 'constants'

// import {} from '@payloadcms/ui/scss'
const Gap = ({ size }: { size: number }) => {
  //export function Gap(props: { size: number }) {
  return (
    <div
      style={{
        paddingTop: `${size}px`,
      }}
    ></div>
  )
}

export default Gap
