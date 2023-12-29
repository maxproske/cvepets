import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; // Needed for absolute positioning of Watermark
  overflow: hidden; // To ensure watermark does not overflow the container
`

const Watermark = styled.div`
  background: url('/img/game/background/Kubernetes_logo_without_workmark.svg') no-repeat center bottom;
  background-size: cover;
  filter: grayscale(100%);
  opacity: 0.05;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;
  pointer-events: none;
`

const Title = styled.div`
  font-size: 0.75rem;
  background-color: #222;
  color: white;
  padding: 0.25rem 1rem 0.25rem 0.5rem;
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 600;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.25rem;
    background-color: orange;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    border-style: solid;
    border-width: 0.7rem 0.7rem 0.7rem 0;
    border-color: transparent white transparent transparent;
    transform: translateY(-50%);
  }
`

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
  gap: 0.5rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid #ddd;
`

const getBackgroundColor = ({ severity, qod }) => {
  let color
  if (severity === 0.0) color = '#d3d3d3' // Pastel grey
  else if (severity <= 3.9) color = '#b2fba5' // Pastel green
  else if (severity <= 6.9) color = '#add8e6' // Pastel blue
  else if (severity <= 8.9) color = '#ffd580' // Pastel orange
  else color = '#ff9999' // Pastel red

  const opacity = qod / 100 // Assuming QOD is on a scale of 0 to 100
  return `rgba(${hexToRgb(color)}, ${opacity})`
}

// Helper function to convert HEX color to RGB
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.substring(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `${r},${g},${b}`
}

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 5px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.75rem;
  width: 300%;
`

const Item = styled.div`
  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.15rem;
  border: 1px solid #aaa;
  position: relative;
  padding: 0.15rem;

  .item-image-wrapper {
    display: flex;
    background-color: ${({ severity, qod }) => getBackgroundColor({ severity, qod })};

    width: 100%;
    height: 100%;
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%); /* Example clip-path */
  }

  .item-image {
    align-self: center;
    justify-self: center;
    width: 100%;
    height: 100%;
    max-width: 2rem;
    max-height: 2rem;
    margin: 0 auto;
  }

  .item-count {
    font-weight: 600;
    font-size: 0.75rem;
    position: absolute;
    bottom: 0;
    right: 0.15rem;
    color: #666;
    text-shadow: -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff, 1px 1px 0px #fff;
  }

  &:before {
    content: '';
    float: left;
    padding-top: 100%; /* This creates a 1:1 aspect ratio */
  }

  &:after {
    content: '';
    display: block;
    clear: both;
  }

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`

const Button = styled.button`
  background: #222;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
`

const ItemsAcquired = ({ items }) => {
  return (
    <Container>
      <Watermark />
      <Title>Items Acquired</Title>
      <ItemsGrid>
        {items.map((item) => (
          <Item key={item.id} severity={+item.severity} qod={+item.qod}>
            <div className="item-image-wrapper">
              <div className="item-image">
                <Image src="/img/game/items/icons8-minecraft-diamond-96.png" width="96" height="96" alt="Item" />
              </div>
            </div>
            <div className="item-count">x{item.results.count}</div>
            <div style={{ display: 'none' }}>{item.qod}</div>
            <Tooltip>
              {item.name} ({item.severity})
            </Tooltip>
          </Item>
        ))}
      </ItemsGrid>
      <Button>Next</Button>
    </Container>
  )
}

export default ItemsAcquired
