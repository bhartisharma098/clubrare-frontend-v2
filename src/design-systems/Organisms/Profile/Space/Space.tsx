import { useCallback, useEffect, useMemo } from 'react'
import { IScene } from '@layerhub-io/types'
import { Canvas as LayerHubCanvas, useEditor } from '@layerhub-io/react'

import { SpaceIcon, Typography, Image, Button } from 'design-systems/Atoms'
import spaceBgImage from 'assets/images/BluredBG.png'
import spaceImage from 'assets/images/space.png'
import { useOverlay, useSpace } from 'context'

import { config, fetchSceneData, loadTemplateFonts, textClassName } from './utils'
import type { IDesign, SpaceProps } from './interface'
import { OverlayIds } from 'design-systems/Organisms/Managers'

export const Space: React.FC<SpaceProps> = ({
  className = '',
  isConnected = true,
  isEmptySpace = true,
  spaceUrl,
  userIdOrAddress,
  isGuest = false,
}) => {
  const editor = useEditor()
  const { openOverlay } = useOverlay()
  const { openEditor, setOpenEditor } = useSpace()

  const classNames = useMemo(
    () => ['w-full h-186 lg:h-540 lg:w-960 bg-neutral-600 flex justify-center items-center', className].join(' '),
    [className]
  )

  useEffect(() => {
    if (editor) {
      // editor issue fix
      const canvasContainers = document.getElementsByClassName('canvas-container')
      if (canvasContainers.length > 1) {
        const copyHtml = canvasContainers[1]
        canvasContainers[0].remove()
        const tt = document.getElementById('layerhub_io_canvas_container')
        if (tt && tt.childNodes) {
          tt.appendChild(copyHtml)
        }
      }
      // resize frame
      editor.frame.resize({
        width: 1790,
        height: 1020,
      })
      if (spaceUrl) loadGraphicTemplate(spaceUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, spaceUrl])

  const loadGraphicTemplate = useCallback(
    async (url: string) => {
      try {
        const activeScene: IDesign = await fetchSceneData(url)
        const { scenes: _scenes } = activeScene
        for (const scn of _scenes) {
          const scene: IScene = {
            name: scn.name,
            frame: {
              width: 1790,
              height: 1020,
            },
            id: scn.id,
            layers: scn.layers,
            metadata: {},
          }
          await loadTemplateFonts(scene)
          await editor.scene.importFromJSON(scene)
          await editor.renderer.render(scene)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [editor]
  )

  return (
    <>
      {isConnected && (
        <>
          {!isEmptySpace ? (
            <div
              className={`${
                isGuest || !openEditor ? 'pointer-events-none' : ''
              } mt-4 flex h-186  flex-1 md:h-400 lg:h-540`}
            >
              <div className="relative flex flex-1 flex-col">
                <div className="relative flex flex-1">
                  <LayerHubCanvas config={config} />
                </div>
              </div>
            </div>
          ) : (
            <div className={classNames}>
              <div
                className={`${
                  isGuest && isEmptySpace ? 'pointer-events-none' : ''
                } flex h-96 w-full flex-col items-center justify-center gap-2`}
                onClick={() => {
                  openOverlay(OverlayIds.TOOLBOX, { userIdOrAddress })
                  setOpenEditor(true)
                }}
              >
                <SpaceIcon className="h-10 w-10 cursor-pointer items-center rounded-full bg-neutral-700" />
                <Typography
                  className="cursor-pointer font-RobotoCondensed text-neutral-400"
                  size="small"
                  variant="condensed"
                >
                  Click the Edit Space button to get started
                </Typography>
              </div>
            </div>
          )}
        </>
      )}
      {!isConnected && isEmptySpace && (
        <div className={classNames}>
          <div className="flex w-5/6 items-center">
            <div className="flex w-full flex-col items-center p-2 text-center lg:w-1/2 lg:items-start">
              <Typography className={textClassName} variant="condensed">
                Showcase your NFTs to the world with
                <br /> your own personalized window display
              </Typography>
              <Button className="mt-3 uppercase" onClick={() => openOverlay(OverlayIds.PROFILE)}>
                Connect Wallet
              </Button>
            </div>
            <div className="hidden w-1/2 lg:block">
              <Image src={spaceImage} className="w-full" alt={''} />
            </div>
          </div>
        </div>
      )}
      {!isConnected && !isEmptySpace && (
        <div className={`${classNames} bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${spaceBgImage.src})` }}>
          <div className={`flex flex-col items-center p-2 text-center`}>
            <Typography size="paragraph" variant="condensed" className={textClassName}>
              Showcase your NFTs to the world with
              <br /> your own personalized window display
            </Typography>
            <Button className="mt-3 uppercase" onClick={() => openOverlay(OverlayIds.PROFILE)}>
              Connect Wallet
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
