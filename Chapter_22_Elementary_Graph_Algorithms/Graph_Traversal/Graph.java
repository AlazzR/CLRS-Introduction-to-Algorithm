package Java_Training.Graph_Traversal;

import java.util.Hashtable;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Set;

//I will deal only with directed graph
public class Graph {
    private int numVertices;
    public Hashtable<Integer, LinkedList<Node>> g;
    public Hashtable<Integer, Node> vertices;//Simple Hashtable because the ids' of the nodes are unique, and to allow us to have amortized constant time.

    Graph(Node node){
        this.g = new Hashtable<Integer, LinkedList<Node>>();
        this.vertices = new Hashtable<Integer, Node>();
        this.numVertices = 0;

        if(node != null){
            LinkedList<Node> adj = new LinkedList<Node>();
            g.put(node.getId(), adj);//the g will have our edges.
            this.numVertices++;
            this.vertices.put(node.getId(), node);
        }
    }
    
    void putNode(Node vertex, Node adjacentNode){
        //nned to add the adjacent node to the graph
        if( adjacentNode != null && !g.containsKey(adjacentNode.getId()) )
        {
            LinkedList<Node> adj = new LinkedList<Node>();
            g.put(adjacentNode.getId(), adj);
        }
        //Now, we need to check for the vertex
        if( g.containsKey(vertex.getId()) && adjacentNode != null ){
            LinkedList<Node> tmp = g.get(vertex.getId());//Will be passed by reference
            tmp.addLast(adjacentNode);
            //insert the adjacent node in our vertices of the graph if it doesn't exist
            if(!this.vertices.containsKey(adjacentNode.getId())){
                this.vertices.put(adjacentNode.getId(), adjacentNode);
                this.numVertices++;
            }
            return;
        }
        if(!this.vertices.containsKey(vertex.getId()))
        {
            this.vertices.put(vertex.getId(), vertex);
            this.numVertices++;
        }

        if(adjacentNode == null)
        {
            LinkedList<Node> adj = new LinkedList<Node>();
            g.put(vertex.getId(), adj);
            return;

        }
        LinkedList<Node> adj = new LinkedList<Node>();
        adj.addLast(adjacentNode);
        g.put(vertex.getId(), adj);
        //insert the adjacent node in our vertices of the graph if it doesn't exist
        if(!this.vertices.containsKey(adjacentNode.getId())){
            this.vertices.put(adjacentNode.getId(), adjacentNode);
            this.numVertices++;
        }
    }
    
    void print(){
        System.out.println("The number of vertices are: " + this.numVertices);
        System.out.println("The vertices in this graph are:");
        Set<Integer> keys = this.vertices.keySet();
        for(Integer key: keys){
            System.out.println(this.vertices.get(key).print());
        }
        System.out.println("The edges in this graph are");
        Set<Integer> vert = this.g.keySet();
        for(Integer key: vert){
            System.out.println("The neighbors of " + Integer.toString(key));
            ListIterator<Node> iter = this.g.get(key).listIterator();
            while(iter.hasNext()){
                System.out.println(iter.next().print());

            }
        }
        System.out.println("----------------------------------------------------");
    }
}
