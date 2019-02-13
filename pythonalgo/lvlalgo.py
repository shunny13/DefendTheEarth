def make():
    mi =150
    ma=690
    dif = (ma-mi)//10
    r=0
    for i in range(1,6):
        print('['+str(mi+i*dif)+', 1],')
        print('['+str(ma - i*dif)+', 1],')
        r+=1
make()
