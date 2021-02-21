package Java_Training.Shortest_Path;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Set;

public class Graph {
    public HashMap<Integer, Node> vertices;
    public HashMap<Integer, LinkedList<Tuple>> edges;
    
    Graph(){
        this.vertices = new HashMap<Integer, Node>();
        this.edges = new HashMap<Integer, LinkedList<Tuple>>();
    }

    void insertNodeWithAdj(Node vertex, Node adj, int weight){
        Tuple edge = new Tuple(adj, weight);
        if( !this.vertices.containsKey(vertex.id) ){
            //vertex doesn't exist in the graph
            this.vertices.put(vertex.id, vertex);

            LinkedList<Tuple> tmp = new LinkedList<Tuple>();
            if( adj != null)
                tmp.addLast(edge);
            this.edges.put(vertex.id, tmp);
        }
        else{
            //vertex exist in the graph
            if( adj != null)
                this.edges.get(vertex.id).addLast(edge);
            else
                throw new Error("You need to provide adjacent node");
        }
        //insert the adjacent node in the graph
        if( !this.vertices.containsKey(adj.id) ){
            this.vertices.put(adj.id, adj);
            LinkedList<Tuple> tmp = new LinkedList<Tuple>();
            this.edges.put(adj.id, tmp);
        }

    }

    void print_graph(){
        Set<Integer> keysVertices = this.vertices.keySet();
        for(Integer key: keysVertices){
            System.out.println("Vertex: " + this.vertices.get(key).id );
            System.out.println("My neighbors are: ");
            ListIterator<Tuple> list= this.edges.get(key).listIterator();
            while( list.hasNext() ){
                Tuple tmp = list.next();
                System.out.println("Neighbor:" + tmp.node.id + " weight of this edge: " + tmp.weight );
            }
        }
    }
}
