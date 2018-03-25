var vueInstance = new Vue({
    el:'#canvas',
    data:{
        name:"2048", 
        score:0,
        grid:[
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ], 
        newAddedCell : [0,0]
    },
    created:function(){
        this.grid = this.addNumInRandomLocation(this.grid);
        this.grid = this.addNumInRandomLocation(this.grid);
       
    },
    mounted:function(){
        this.updateCellColors(this.$refs);
    },
    updated:function(){
        this.updateCellColors(this.$refs);
        this.updateNewAddedCellBorder(this.$refs, this.newAddedCell);
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
                this.newAddedCell = [freeCells[rand1].x ,freeCells[rand1].y]                
            }
            return gridTemp;
        }, 
        keyPressed:function(event){
            var pastGrid = this.copyGrid(this.grid); 
            if(event){
                switch (event.code){
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
            }
            if(this.compareGrids(pastGrid,this.grid)){
                this.grid = this.addNumInRandomLocation(this.grid);            
                this.updateCellColors(this.$refs);      
                          
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
        setScore:function(s){
            this.score+=s;
        },
        slideArraysInGrid:function(tempGrid, dir){
            var g = this.copyGrid(tempGrid); 
            for(var i = 0; i< g.length; i++){
                var lengthOfArray = g[i].length;
                g[i] = g[i].filter(v => v);     
                g[i] = this.combineValues(g[i], dir)
                g[i] = g[i].filter(v => v); 
                var tempLength = g[i].length; 
                for(var k = 0; k< lengthOfArray - tempLength; k++){
                    if(dir == 'left')
                        g[i].push(0);
                    else if(dir == 'right')
                        g[i].unshift(0);
                }
            };
            return g; 
        }, 
        combineValues:function(gridArray, dir){
            if(dir == 'left'){
                for(var i = 0; i< gridArray.length-1; i++){
                    if( gridArray[i]!== 0 && gridArray[i] === gridArray[i+1]){
                        gridArray[i] = gridArray[i]*2;
                        gridArray[i+1] = 0;
                        this.setScore(gridArray[i]);
                    }
                }
            }
            else if(dir == 'right'){
                for(var i = gridArray.length-1; i > -1 ; i--){
                    if( gridArray[i]!== 0 && gridArray[i] === gridArray[i-1]){
                        gridArray[i] = gridArray[i]*2;
                        gridArray[i-1] = 0;
                        this.setScore(gridArray[i]);
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

        }, updateCellColors:function(refrences){
            var cell;
            var classList = 'col span_1_of_4' ;
            for(var r = 0; r<this.grid.length; r++){
                for(var k = 0; k<this.grid[r].length; k++){
                    cell = refrences['counter_'+r+'_'+k][0];
                    cell.classList = [];
                    switch (cell.textContent){
                        case '2':
                        case '4':
                            cell.classList.value=classList + " bg_2_4";
                        break;
                        case '8':
                            cell.classList.value=classList + " bg_8";
                        break;
                        case '16':
                            cell.classList.value=classList + " bg_16";
                        break;
                        case '32':
                            cell.classList.value=classList + " bg_32";
                        break;
                        case '64':
                            cell.classList.value=classList + " bg_64";
                        break;
                        case '128':
                            cell.classList.value=classList + " bg_128";
                        break;
                        case '256':
                            cell.classList.value=classList + " bg_256";
                        break;
                        case '2048':
                            cell.classList.value=classList + " newBorder2048";
                        break;
                        case '':
                            cell.classList.value=classList + "";
                        break;
                        default:
                            cell.classList.value=classList + " bg_high";
                        break;
                    }
                }

            }
        }, 
        updateNewAddedCellBorder:function(refrences, newCell){
            var cell = refrences['counter_'+newCell[0]+'_'+newCell[1]][0];
            cell.classList.value = cell.classList.value + " newBorder";
            console.log(cell);
        }


    }
    
})

document.onkeyup = function(){
    vueInstance.keyPressed(event)
}