import {Editor, Frame, Element} from "@craftjs/core";

const LandingPages = () => {
  return (
    <div>
      <h2>My App!</h2>
      <Editor>
        <h2>My Page Editor</h2>
        <Frame
          
        > 
          <Element  canvas> // defines the Root Node
            <h2>Drag me around</h2>
            {/* <MyComp text="You can drag me around too" /> */}
            <Element is="div" style={{background: "#333" }}>
              <p>Same here</p>
            </Element>
          </Element>
        </Frame>
      </Editor>
    </div>
  )
}
export {LandingPages}