package Java_Training.Graph_Traversal;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;
import java.util.List;


//Resemble the LIFO stacks.
public class DFS {
    public static class DFSResults{
       public HashMap<Integer, Node> parents = new HashMap<Integer, Node>();
       public HashMap<Integer, Integer> start_time = new HashMap<Integer, Integer>();
       public HashMap<Integer, Integer> end_time = new HashMap<Integer, Integer>();
       public LinkedList<Node> order = new LinkedList<Node>();
       public HashMap<String, String> edge_type = new HashMap<String, String>();
       public Integer t=0;
    }
    public static DFSResults dfs(Graph g){
        DFSResults results = new DFSResults();
        List<Integer> keys = new ArrayList<Integer>(g.g.keySet());
        Collections.sort(keys);
        Iterator<Integer> pointer = keys.iterator();
        while(pointer.hasNext()){
            Integer key = pointer.next();
            //if key wasn't found then we are starting a new connected component
            if( !results.parents.containsKey(key) ){
                //System.out.println(key);
                dfs_visit(g, g.vertices.get(key), results, null);
            }
        }
        System.out.println("Edges with their types: ");
        List<String> edges = new ArrayList<String>(results.edge_type.keySet());
        Collections.sort(edges);
        Iterator<String> edgesPtr = edges.iterator();
        while( edgesPtr.hasNext() ){
            String edge = edgesPtr.next();
            System.out.println(edge + " " + results.edge_type.get(edge));
        }
        System.out.println("----------------------------------------------------");

       return results;
    }

    public static void dfs_visit(Graph graph, Node v, DFSResults results, Node parent){
        //Once we enter the dfs_visit, we need to mark the start time. And the node is definetly isn't visited because we will deal with forward/cross/backward edges in the iterative loop across the neighbors of v.
        results.t += 1;
        results.start_time.put(v.getId(), results.t);
        results.parents.put(v.getId(), parent);
        //Enter a dfs_visit indicates that we are dealing with a tree edge
        if(parent != null){
            results.edge_type.put(Integer.toString(parent.getId()) + "->" + Integer.toString(v.getId()), "tree");        
        }
        //iterate through the neighbors of v
        ListIterator<Node> neighbors = graph.g.get(v.getId()).listIterator();
        while(neighbors.hasNext()){
            Node node = neighbors.next();
            //System.out.println(node.print());
            if( !results.parents.containsKey(node.getId()) ){
                //Then this means this node wasn't visited and we can do dfs on it
                dfs_visit(graph, node, results, v);
            }
            else if ( !results.end_time.containsKey(node.getId()) ) {
                //Then this will be a backward edge, in which it is indicated that node is fully processed
                results.edge_type.put(Integer.toString(v.getId()) + "->" + Integer.toString(node.getId()), "backward");
                
            } else if( results.start_time.get(v.getId()) < results.start_time.get(node.getId()) ){
                //Then this is a forward edge
                results.edge_type.put( Integer.toString(v.getId()) + "->" + Integer.toString(node.getId()), "forward" );
                
            }else{
                //Then this is a cross edge
                results.edge_type.put( Integer.toString(v.getId()) + "->" + Integer.toString(node.getId()), "cross" );
            }
        }
        //After exiting the stack, we can close the stack on v.
        results.t += 1;
        results.end_time.put(v.getId(), results.t);
        results.order.addFirst(v);//THis will be used for toplogical sort
    }

    public static LinkedList<Node> toplogical_sort(Graph g){
        DFSResults results = dfs(g);
        ListIterator<Node> reverse = results.order.listIterator(results.order.size());
        LinkedList<Node> reversedList = new LinkedList<Node>();
        while( reverse.hasPrevious() ){
            Node node = reverse.previous();
            reversedList.addLast(node);
        }

        System.out.println("Topological sort: ");
        for(int ind=0; ind < results.order.size(); ind++){
            System.out.print(Integer.toString(results.order.get(ind).getId()) + '-');
        }
        System.out.println("----------------------------------------------------");
        System.out.println("All possible paths excluding edges that are marked other than a tree edge.");
        System.out.println();
        //HashMap<Integer, Boolean> processed = new HashMap<Integer, Boolean>();
        while( !reversedList.isEmpty() ){
            Node node = reversedList.removeFirst();
            LinkedList<Node> successorNodes = new LinkedList<Node>();
            Node parent = results.parents.get(node.getId());
            Node tmp = node;
            //find related nodes
            while( parent != null ){
                //if result parent was null then we reached the root
                successorNodes.addFirst(tmp);
                //processed.put(tmp.getId(), true);//To not enter the while loop when we saw it as a descendent of other nodes.
                tmp = parent;
                parent = results.parents.get(tmp.getId());//update parent to the parent of current parent.
                /*                 
                    if(parent == null){
                        //processed.containsKey(tmp.getId());
                        successorNodes.addFirst(tmp);//to get the roots

                } */
            }
            //if(!processed.containsKey(tmp.getId()))
            successorNodes.addFirst(tmp);//For orphan nodes

            ListIterator<Node> nodesPtr = successorNodes.listIterator();
            while( nodesPtr.hasNext() ){
                Node nodesTmp = nodesPtr.next();
                System.out.print(Integer.toString(nodesTmp.getId()) + ' ');
            }
            System.out.println();//print each related nodes on the same line
        }
        System.out.println("\n----------------------------------------------------");

        return results.order;
    }

    public static Boolean isDAG(Graph g){
        DFSResults results = dfs(g);
        Set<String> keys = results.edge_type.keySet();
        for( String key: keys ){
            if( results.edge_type.get(key).equals("backward") ){

                System.out.println("This is't a DAG because it have a BE at " + key);
                return false;
            }
        }
        System.out.println("This is a DAG");
        System.out.println("----------------------------------------------------");

        return true;
    }

    
}
