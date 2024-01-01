import Image from 'next/image'
import styled from 'styled-components'

const ItemWrapper = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.15rem;
  border: 1px solid #aaa;
  position: relative;
  padding: 0.15rem;
  cursor: pointer;
  height: 100%;
  max-height: 55px;

  &:before {
    content: '';
    display: block;
    padding-top: 100%; /* This creates the aspect ratio */
  }
`

const ItemImageWrapper = styled.div`
  display: flex;
  background-color: ${({ severity, qod }) => getBackgroundColor({ severity, qod })};
  width: 100%;
  height: 100%;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);

  .center {
    margin: 0 auto;
    align-self: center;
  }
`

const ItemCount = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  right: 0.15rem;
  color: #666;
  text-shadow: -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff, 1px 1px 0px #fff;
`

const getBackgroundColor = ({ severity, qod }) => {
  let color
  if (severity === 0.0) color = '#d3d3d3'
  else if (severity <= 3.9) color = '#b2fba5'
  else if (severity <= 6.9) color = '#add8e6'
  else if (severity <= 8.9) color = '#ffd580'
  else color = '#ff9999'

  const opacity = qod / 100 // Assuming QOD is on a scale of 0 to 100
  return `rgba(${hexToRgb(color)}, ${opacity})`
}

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.substring(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `${r},${g},${b}`
}

export const ItemImage = ({ item, onClick = () => null }) => {
  const { src, results, severity, qod } = item

  if (!item) {
    return
  }

  return (
    <ItemWrapper onClick={onClick}>
      <ItemImageWrapper severity={+severity} qod={+qod}>
        <div className="center">
          <Image
            src={'/img/game/items/icons8-minecraft-diamond-96.png'}
            width="32"
            height="32"
            alt="Item"
            quality={100}
            priority={true}
          />
        </div>
      </ItemImageWrapper>
      <ItemCount>{`x${results.count}`}</ItemCount>
    </ItemWrapper>
  )
}
