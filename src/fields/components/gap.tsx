import exp from 'constants'

// import {} from '@payloadcms/ui/scss'
const Gap = ({ size, key}: { size: number, key: string}) => {
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
