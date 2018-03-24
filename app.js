var vueInstance = new Vue({
    el:'#canvas',
    data:{
        name:"2048", 
        score:0,
        /*combined: false,
        shiftedLeft: false,
        shiftedRight: false,
        shiftedUp: false,
        shiftedDown:false,*/
        grid:[
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ], 
        canvasData : ""
    },
    created:function(){
        this.grid = this.addNumInRandomLocation(this.grid);
        this.grid = this.addNumInRandomLocation(this.grid);
        //console.log(this.grid);
    },
    methods:{
        addNumInRandomLocation:function(gridTemp){
            var freeCells = [];
            for(var i=0; i<gridTemp.length; i++) {
                for(var j=0; j<gridTemp[i].length; j++){
                    if(gridTemp[i][j] === 0){
                        freeCells.push({
                            x:i,
                            y:j
                        })
                    }
                }
            }
            if(freeCells.length > 0){
                var rand1 = Math.floor(Math.random() * freeCells.length);
                gridTemp[freeCells[rand1].x][freeCells[rand1].y] = Math.random(1) > 0.5 ? 2 : 4;
            }
            return gridTemp;
        }, 
        keyPressed:function(event){
            var pastGrid = this.copyGrid(this.grid); 
            switch (event.key){
                case 'ArrowDown':
                    this.keyPressedDown();
                break;
                case 'ArrowUp':
                    this.keyPressedUp();
                break;
                case 'ArrowLeft':
                    this.keyPressedLeft();
                break;
                case 'ArrowRight':
                    this.keyPressedRight(); 
                break;               
            }

            if(this.compareGrids(pastGrid,this.grid)){
                this.grid = this.addNumInRandomLocation(this.grid);            
                this.getScore();
            }
        },
        keyPressedUp: function(){
            this.grid = this.pivotGrid(this.grid);
            this.grid = this.slideArraysInGrid(this.grid, 'left');
            this.grid = this.pivotGrid(this.grid);            
        },
        keyPressedDown: function(){
            this.grid = this.pivotGrid(this.grid);
            this.grid = this.slideArraysInGrid(this.grid, 'right');
            this.grid = this.pivotGrid(this.grid);            
        },
        keyPressedLeft: function(){
            this.grid = this.slideArraysInGrid(this.grid, 'left');            
        },
        keyPressedRight: function(){
            this.grid = this.slideArraysInGrid(this.grid, 'right');            
        }, 
        getScore:function(){
            this.score++;
        },
        slideArraysInGrid:function(tempGrid, dir){
            for(var i = 0; i< tempGrid.length; i++){
                var lengthOfArray = tempGrid[i].length;
                tempGrid[i] = tempGrid[i].filter(v => v);     
                tempGrid[i] = this.combineValues(tempGrid[i], dir)
                tempGrid[i] = tempGrid[i].filter(v => v); 
                var tempLength = tempGrid[i].length; 
                    for(var k = 0; k< lengthOfArray - tempLength; k++){
                        if(dir == 'left')
                            tempGrid[i].push(0);
                        else if(dir == 'right')
                            tempGrid[i].unshift(0);
                    }
            };
            return tempGrid; 
        }, 
        combineValues:function(gridArray, dir){
            if(dir == 'left'){
                for(var i = 0; i< gridArray.length-1; i++){
                    if( gridArray[i]!== 0 && gridArray[i] === gridArray[i+1]){
                    gridArray[i] = gridArray[i]*2;
                    gridArray[i+1] = 0;
                    }
                }
            }
            else if(dir == 'right'){
                for(var i = gridArray.length-1; i > -1 ; i--){
                    if( gridArray[i]!== 0 && gridArray[i] === gridArray[i-1]){
                    gridArray[i] = gridArray[i]*2;
                    gridArray[i-1] = 0;
                    }
                }
            }
            
            return gridArray;
        },
        pivotGrid:function(tempGrid){
            var gridHolder = [[],[],[],[]]; 
            for(var i = 0; i<tempGrid.length; i++){
                for(var j = tempGrid[i].length - 1; j > -1; j--){
                    gridHolder[j][i] = tempGrid[i][j];
                }
            }
            return gridHolder;
        }, 
        copyGrid:function(tempGrid){
            var gridHolder = [[],[],[],[]]; 
            for(var i = 0; i<tempGrid.length; i++){
                for(var j = tempGrid[i].length - 1; j > -1; j--){
                    gridHolder[i][j] = tempGrid[i][j];
                }
            }
            return gridHolder;
        }, 
        compareGrids:function(pastGrid, currentGrid){
            for(var i=0; i<pastGrid.length; i++) {
                for(var j=0; j<currentGrid.length; j++){
                    if(pastGrid[i][j]!== currentGrid[i][j])
                        return true;
                }
            }
            return false; 

        }


    }
    
})