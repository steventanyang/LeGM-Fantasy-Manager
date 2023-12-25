import math


# legm score = average fppg / preseason projected fppg

pts = 25
ast = 6.5
reb = 7.5
tov = 2.0

def calculate(name):

    pre_fppg = 10 #pull from database
    # pts, tpm, fga, fgm, fta, ftm, reb, ast, stl, blk, tov = 0
    fppg = 0
    value = (fppg / pre_fppg)*50

    return value