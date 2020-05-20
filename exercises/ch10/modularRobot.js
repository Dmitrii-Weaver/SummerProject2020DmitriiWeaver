const robot = require ('./robot.js')
runRobot = robot.runRobot
runRobot(robot.VillageState.random(), robot.goalOrientedRobot);