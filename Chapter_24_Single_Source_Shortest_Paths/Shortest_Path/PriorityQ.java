package Java_Training.Shortest_Path;

import java.util.HashMap;
import java.util.Vector;

//Binary minimum heap
public class PriorityQ {
    public Vector<Tuple> nodes;
    public HashMap<Integer, Integer> keyToInd;

    PriorityQ(Vector<Tuple> nodes){
        this.nodes = new Vector<Tuple>();
        this.keyToInd = new HashMap<Integer, Integer>();
        int counter = 0;
        //This will only create the array
        for(Tuple entry: nodes){
            Tuple tmp = new Tuple(entry.node, entry.weight);
            this.nodes.add(tmp);
            this.keyToInd.put(tmp.node.id, counter);
            counter++;
        }
        //building the minimum heapify O(n)
        //#levels = lgn - 1 and #leaves = n/2
        int start;
        if( this.nodes.size()%2 == 0 )
            start = Math.floorDiv(this.nodes.size(), 2) - 1;//to be in the middle of the array
        else 
            start = Math.floorDiv(this.nodes.size(), 2);
        //building the weak RI minimum heap
        for(int ind = start; ind >= 0; ind--){
            this.min_heapify(ind);
        }

    }

    void min_heapify(int i){
        int smallest = i;
        int left  = 2 * i + 1;
        int right = 2 * i + 2; 
        if( this.nodes.size() > left && this.nodes.elementAt(left).weight < this.nodes.elementAt(smallest).weight )
            smallest = left;
        if( this.nodes.size() > right && this.nodes.elementAt(right).weight < this.nodes.elementAt(smallest).weight )
            smallest = right;
        //update the parent
        if( smallest != i ){
            //swap smallest with i
            Tuple tmp = this.nodes.set(i, this.nodes.elementAt(smallest));
            this.nodes.set(smallest, tmp);
            //update the indeces of the node.
            this.keyToInd.put(this.nodes.elementAt(i).node.id, i);
            this.keyToInd.put(this.nodes.elementAt(smallest).node.id, smallest);
            min_heapify(smallest);
        }
    }

    void print_min_heapify(){
        //This would take O(nlgn)
        int counter = 0;
        while(this.nodes.size() != 0){
            System.out.println(counter + ": " +  this.nodes.elementAt(0).node.id + ":" + this.nodes.elementAt(0).weight);
            Tuple tmp = this.nodes.set(0, this.nodes.lastElement());
            this.nodes.removeElementAt(this.nodes.size() - 1);
            min_heapify(0);
            counter++;
        }
        this.keyToInd.clear();
    }

    Tuple removeTopPriority(){
        Tuple topPriority = new Tuple(this.nodes.elementAt(0).node, this.nodes.elementAt(0).weight);
        this.nodes.set(0, this.nodes.lastElement());
        this.keyToInd.put(this.nodes.elementAt(0).node.id, 0);//update the index of the node that was put at top
        this.keyToInd.remove(topPriority.node.id);
        this.nodes.removeElementAt(this.nodes.size() - 1);
        min_heapify(0);//to update the heap tree
        return topPriority;
    }
    void updatePriorityQ(Tuple s, Tuple d, int w){
        if( this.keyToInd.containsKey(d.node.id) ){
            if(s.node.id == d.node.id){
                int ind = this.keyToInd.get(d.node.id);
                this.nodes.get(ind).weight = 0;
                this.reverse_min_heapify(ind);
                return;
            }
            //System.out.println(this.keyToInd.get(d.node.id));
            if( this.nodes.get(this.keyToInd.get(d.node.id)).weight >= s.weight + w ){
                int ind = this.keyToInd.get(d.node.id);
                this.nodes.get(ind).weight = s.weight + w;
                //update the parent
                this.nodes.get(ind).node.parent = s.node;
                this.reverse_min_heapify(ind);//ensure that the weak RI is maintained
            }
            else{
                System.out.println("Keep the edge weight as it is, we already relaxed it to the optimal value at: " + + s.node.id + "->" + d.node.id);
            }
        }
        else{
            System.out.println("Cycle Detected at: " + s.node.id + "->" + d.node.id);
        }

    }

    void reverse_min_heapify(int i){
        if(i == 0)
            return;//We reached the root
        int parent = Math.floorDiv(i, 2);
        if( i%2 == 0 )
            parent -= 1;

        int tmp = parent;
        int left  = 2 * parent + 1;
        int right = 2 * parent + 2; 
        //To avoid figuring out whether i is on the left or the right of the parent, we will deal with i as unknown
        if( this.nodes.size() > left && this.nodes.elementAt(tmp).weight > this.nodes.elementAt(left).weight )
            tmp = left;
        if( this.nodes.size() > right && this.nodes.elementAt(tmp).weight > this.nodes.elementAt(right).weight )
            tmp = right;
        //update the parent
        if( tmp != parent ){
            //swap smallest with i
            Tuple tmpNode = this.nodes.set(parent, this.nodes.elementAt(tmp));
            this.nodes.set(tmp, tmpNode);
            //update the indeces of the node.
            this.keyToInd.put(this.nodes.elementAt(parent).node.id, parent);
            this.keyToInd.put(this.nodes.elementAt(tmp).node.id, tmp);

            reverse_min_heapify(parent);
        }
    }
}
