enum ActionKind {
    Walking,
    Idle,
    Jumping,
    walkUp,
    walkDown
}
namespace SpriteKind {
    export const Segment = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    newDirection = up
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    newDirection = left
})
function killPoison () {
    if (info.score() % 10 == 0) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.disintegrate, 500)
    }
}
function addFood () {
    if (Math.percentChance(15) && info.score() > 0) {
        mySprite = sprites.create(assets.image`poison`, SpriteKind.Enemy)
        randomizeFood(mySprite)
        if (mySprite.overlapsWith(Head)) {
            sprites.destroy(mySprite)
        }
        addFood()
    } else {
        mySprite = sprites.create(assets.image`food`, SpriteKind.Food)
        randomizeFood(mySprite)
    }
}
function initializeFood (num: number) {
    for (let index = 0; index < num; index++) {
        addFood()
    }
}
function setSegmentDirection (direction: number, segment: Sprite, leader: Sprite) {
    segment.setVelocity(XV[direction], YV[direction])
    segment.setImage(SegmentImage[direction])
    if (direction == up) {
        segment.x = leader.x
        segment.top = leader.bottom - segmentOffset
    } else if (direction == down) {
        segment.x = leader.x
        segment.bottom = leader.top + segmentOffset
    } else if (direction == left) {
        segment.left = leader.right - segmentOffset
        segment.y = leader.y
    } else if (direction == right) {
        segment.right = leader.left + segmentOffset
        segment.y = leader.y
    } else {
        segment.setPosition(leader.x, leader.y)
    }
}
function initializeGraphics () {
    depth = 100
    HeadImage = [
    assets.image`Head4`,
    assets.image`Head4`,
    assets.image`Head8`,
    assets.image`Head6`,
    assets.image`Head7`
    ]
    SegmentImage = [
    assets.image`segmentUp`,
    assets.image`segmentUp`,
    assets.image`segmentUp`,
    assets.image`segmentRight`,
    assets.image`segmentRight`
    ]
    newDirection = stop
    directionsList = [newDirection]
    Head = sprites.create(HeadImage[stop], SpriteKind.Player)
    Head.setPosition(80, 61)
    Head.z = depth
    Head.setFlag(SpriteFlag.AutoDestroy, true)
    lastSegment = Head
    segmentOffset = 2
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    newDirection = right
})
function setHeadDirection (direction: number) {
    Head.setVelocity(XV[direction], YV[direction])
    Head.setImage(HeadImage[direction])
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    newDirection = down
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 100)
    addSegment()
    addFood()
    killPoison()
})
function initializeDirectionsAndSpeeds () {
    SPEED = 80
    stop = 0
    up = 1
    down = 2
    left = 3
    right = 4
    XV = [
    0,
    0,
    0,
    0 - SPEED,
    SPEED
    ]
    YV = [
    0,
    0 - SPEED,
    SPEED,
    0,
    0
    ]
}
function randomizeFood (mySprite: Sprite) {
    mySprite.setPosition(randint(5, 155), randint(5, 115))
}
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    game.gameOver(false)
})
function addSegment () {
    info.changeScoreBy(1)
    depth += -1
    newSegment = sprites.create(assets.image`segmentUp`, SpriteKind.Segment)
    if (info.score() < 3) {
        newSegment.setFlag(SpriteFlag.Ghost, true)
    }
    newSegment.setPosition(lastSegment.x, lastSegment.y)
    newSegment.z = depth
    lastSegment = newSegment
    directionsList.push(stop)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Segment, function (sprite, otherSprite) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let leadingSegment: Sprite = null
let i = 0
let newSegment: Sprite = null
let SPEED = 0
let lastSegment: Sprite = null
let directionsList: number[] = []
let stop = 0
let HeadImage: Image[] = []
let depth = 0
let segmentOffset = 0
let right = 0
let down = 0
let SegmentImage: Image[] = []
let YV: number[] = []
let XV: number[] = []
let Head: Sprite = null
let mySprite: Sprite = null
let left = 0
let up = 0
let newDirection = 0
scene.setBackgroundColor(12)
initializeDirectionsAndSpeeds()
initializeGraphics()
initializeFood(5)
game.onUpdateInterval(100, function () {
    directionsList.unshift(newDirection)
    directionsList.pop()
    setHeadDirection(newDirection)
    i = 1
    leadingSegment = Head
    for (let bodySegment of sprites.allOfKind(SpriteKind.Segment)) {
        setSegmentDirection(directionsList[i], bodySegment, leadingSegment)
        i += 1
        leadingSegment = bodySegment
    }
})
