@namespace
class SpriteKind:
    Segment = SpriteKind.create()

def on_up_pressed():
    Head.set_velocity(0, -100)
    Head.set_image(assets.image("""
        Head0
    """))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_left_pressed():
    Head.set_velocity(-100, 0)
    Head.set_image(assets.image("""
        Head1
    """))
    addSegment()
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    Head.set_velocity(100, 0)
    Head.set_image(assets.image("""
        Head2
    """))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_pressed():
    Head.set_velocity(0, 100)
    Head.set_image(assets.image("""
        Head
    """))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_on_destroyed(sprite):
    game.game_over(False)
sprites.on_destroyed(SpriteKind.player, on_on_destroyed)

def addSegment():
    global lastSegment, depth, newSegment
    if len(segments) > 0:
        lastSegment = segments[len(segments)]
    else:
        lastSegment = Head
    depth += -1
    newSegment = sprites.create(assets.image("""
        segmentB
    """), SpriteKind.Segment)
    newSegment.set_position(lastSegment.x, lastSegment.y)
    newSegment.z = depth
    animation.run_image_animation(newSegment,
        [img("""
                . . . . . . . f . . . . . . . . 
                        . . . . . . . f . . . . . . . . 
                        . . . e f f f f f f f e . . . . 
                        . . e f 4 4 4 4 4 4 4 f e . . . 
                        . . f 4 4 b b b b b 4 4 f . . . 
                        . . f 4 b 8 8 8 8 8 b 4 f . . . 
                        . . f 4 3 2 2 2 2 2 3 4 f . . . 
                        . . f 9 8 8 a a a 8 8 9 f . . . 
                        . . f 4 3 2 2 2 2 2 3 4 f . . . 
                        . . f 4 b 8 8 8 8 8 b 4 f . . . 
                        . . f 4 4 b b b b b 4 4 f . . . 
                        . . e f 4 4 4 4 4 4 4 f e . . . 
                        . . . e f f f f f f f e . . . . 
                        . . . . . . . f . . . . . . . . 
                        . . . . . . . f . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . f . . . . . . . . . . 
                        . . . . . . f . . . . . . . . . 
                        . . . e f f f f f f f e . . . . 
                        . . e f 4 4 4 4 4 4 4 f e . . . 
                        . . f 4 4 b b b b b 4 4 f . . . 
                        . . f 4 b 8 8 8 8 8 b 4 f . . . 
                        . . f 4 3 2 2 2 2 2 3 4 f . . . 
                        . . f 9 8 8 a a a 8 8 9 f . . . 
                        . . f 4 3 2 2 2 2 2 3 4 f . . . 
                        . . f 4 b 8 8 8 8 8 b 4 f . . . 
                        . . f 4 4 b b b b b 4 4 f . . . 
                        . . e f 4 4 4 4 4 4 4 f e . . . 
                        . . . e f f f f f f f e . . . . 
                        . . . . . . f . . . . . . . . . 
                        . . . . . f . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . f . . . . . . 
                        . . . . . . . . f . . . . . . . 
                        . . . e f f f f f f f e . . . . 
                        . . e f 4 4 4 4 4 4 4 f e . . . 
                        . . f 4 4 b b b b b 4 4 f . . . 
                        . . f 4 b 8 8 8 8 8 b 4 f . . . 
                        . . f 4 3 2 2 2 2 2 3 4 f . . . 
                        . . f 9 8 8 a a a 8 8 9 f . . . 
                        . . f 4 3 2 2 2 2 2 3 4 f . . . 
                        . . f 4 b 8 8 8 8 8 b 4 f . . . 
                        . . f 4 4 b b b b b 4 4 f . . . 
                        . . e f 4 4 4 4 4 4 4 f e . . . 
                        . . . e f f f f f f f e . . . . 
                        . . . . . . . . f . . . . . . . 
                        . . . . . . . . . f . . . . . . 
                        . . . . . . . . . . . . . . . .
            """)],
        100,
        True)
    segments.append(newSegment)
newSegment: Sprite = None
lastSegment: Sprite = None
segments: List[Sprite] = []
Head: Sprite = None
depth = 0
depth = 100
scene.set_background_color(12)
Head = sprites.create(assets.image("""
    Head0
"""), SpriteKind.player)
Head.set_position(80, 61)
Head.z = depth
Head.set_flag(SpriteFlag.AUTO_DESTROY, True)
segments = []