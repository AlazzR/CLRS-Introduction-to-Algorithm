package Java_Training.Graph_Traversal;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Set;
//I will use queue based BFS
public class BFS {
    private static class BFSResult{
        public HashMap<Integer, Node> parents = new HashMap<Integer, Node>();
        public HashMap<Integer, Integer> levels = new HashMap<Integer, Integer>();
    }
    public static HashMap<Integer,  Node> getShortestPath(Graph graph, Node v){
        BFSResult results = new BFSResult();
        results.parents.put(v.getId(), (Node)null);
        results.levels.put(v.getId(), 0);
        LinkedList<Node> frontier = new LinkedList<Node>();//FIFO manner
        frontier.addLast(v);
        //The following will execute the BFS algorithm
        System.out.println("Nodes seen in the frontier");
        while(frontier.peek() != null){
            Node firstInQueue = frontier.poll();

            System.out.println(firstInQueue.print());
            ListIterator<Node> adjacents = graph.g.get(firstInQueue.getId()).listIterator();
            while(adjacents.hasNext()){
                Node tmp = adjacents.next();
                if(!results.parents.containsKey(tmp.getId())){
                    results.parents.put(tmp.getId(), firstInQueue);
                    results.levels.put(tmp.getId(), results.levels.get(firstInQueue.getId()) + 1);
                    frontier.addLast(tmp);
                }
            }
        }
        //System.out.println(results.levels.keySet());
        List<Integer> levelsSort = new ArrayList<Integer>(results.levels.values());
        List<Integer> idsSort = new ArrayList<Integer>(results.levels.keySet());
        HashMap<Integer, HashMap<Integer, Node>> shortestpath = new HashMap<Integer, HashMap<Integer, Node>>();
        //sort the keys and levels in an ascending manner
        Collections.sort(levelsSort);
        Collections.sort(idsSort);

        //iterate through levels
        Iterator<Integer> keys = levelsSort.iterator();
        while(keys.hasNext()){
            Integer key = keys.next();
            Iterator<Integer> ids = idsSort.iterator();
            //iterate through the ids that are in this level
            while(ids.hasNext()){
                Integer id = ids.next();
                if(results.levels.get(id) == key){
                    results.levels.remove(id);//remove this node
                    //if the level doesn't exist
                    if( shortestpath.get(key) == null ){
                        HashMap<Integer, Node> tmp = new HashMap<Integer, Node>();
                        tmp.put(id, graph.vertices.get(id));
                        shortestpath.put(key, tmp);
                        continue;
                    }
                    //if the node doesn't exist in the level.
                    if(shortestpath.get(key).get(id) == null)
                    {
                        shortestpath.get(key).put(id, graph.vertices.get(id));
                    }
                }
            }
        }
        //print the order of the node
        Set<Integer> shortestKeys = shortestpath.keySet();
        System.out.println("All neighbors ordered in a tree manner");
        for(Integer shortestKey: shortestKeys){
            System.out.println("Level: " + shortestKey);
            ArrayList<Node> nodes = new ArrayList<Node>(shortestpath.get(shortestKey).values());
            for(Node node: nodes)
                System.out.println("\t" +node.print());
        } 
        return results.parents;
    }
    
    public static LinkedList<Node> getPath(Graph g, Node start, Node end){
        LinkedList<Node> path = new LinkedList<>();
        HashMap<Integer, Node> tree = getShortestPath(g, start);
        if(tree.get(end.getId()) == null){
            return path;
        }
        Node tmp = end;
        //recursively backtrack to our start.
        while(tmp != null){
            path.addFirst(tmp);
            tmp = tree.get(tmp.getId());//give me my parent
        }
        return path;
    }
    
}
