package Java_Training.Shortest_Path;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Vector;
import java.util.Set;

public class Dijkstra_algorithm {
    
    public static LinkedList<Tuple> dijkstra(Graph g, Node start, Node end){
        if(start == null || end == null)
            return null;
        Vector<Tuple> tmpQ = new Vector<Tuple>();
        Set<Integer> tmpKeys = g.vertices.keySet();
        //initialize the priority queue
        for(Integer key: tmpKeys){
            tmpQ.add(new Tuple(g.vertices.get(key), Integer.MAX_VALUE));
        }
        PriorityQ queue = new PriorityQ(tmpQ);
        queue.updatePriorityQ(new Tuple(start, 0), new Tuple(start, 0), 0);//initialize start to the lowest in the priority queue

        LinkedList<Tuple> path = new LinkedList<Tuple>();
        HashMap<Integer, Tuple> costs = new HashMap<Integer, Tuple>();
        while(queue.nodes.size() != 0){
            Tuple u = queue.removeTopPriority();//remove u that correspond to the node with the highest priority
            costs.put(u.node.id, u);
            //update the neighbors of u
            ListIterator<Tuple> neighbors = g.edges.get(u.node.id).listIterator();
            //Relaxation step
            while( neighbors.hasNext() ){
                Tuple neighbor = neighbors.next();
                queue.updatePriorityQ(u, neighbor, neighbor.weight);
            }
        }
        
        Set<Integer> keysCost = costs.keySet();
        //show the cost of every edge at the end of Dijkstra
        System.out.println("All possible shortest paths.");
        for(Integer key: keysCost){
            System.out.println("Node: " + costs.get(key).node.print() + " weight: " + costs.get(key).weight);
        }
        
        System.out.println("---------------------------------------------------------------");
        System.out.println("The shortest path from  " + start.id + "->" + end.id);
        Tuple currentNode = costs.get(end.id);
        while(currentNode != null){
            if(Math.abs(currentNode.weight) == Integer.MAX_VALUE - 2)
            {
                System.out.println("There are no path from " + start.id + "->" + end.id);
                return null;
            }
            path.addFirst(currentNode);
            System.out.println("Node: " + currentNode.node.print() + " weight: " + currentNode.weight);
            if(currentNode.node.parent == null)
                break;//We reached the root
            currentNode = costs.get(currentNode.node.parent.id);
        }
        
        return path; 
    }
}
