#include "SLL.hpp"

void SlList::addNodeHead(int id)
{
    this->head = new SlNode(id, this->head);//pass head to next, then we update the new head.
    if(this->tail == NULL)
        tail = head;
}

void SlList::addNodeTail(int id)
{
    if(head == NULL)
    {
        this->addNodeHead(id);//The list is empty
    }
    if(tail != NULL)
    {
       this->tail->next = new SlNode(id);
       this->tail = this->tail->next;

    }
}

int SlList::deleteFromHead()
{
    int info;
    //test if we have empty list
    if(head == 0)
    {
        std::cout << "Empty Linked List" << std::endl;
        return -1;
    }
    if(head == tail)
    {
        SlNode* tmp = head;
        info = head->getId();
        head = NULL;
        tail = NULL;
        delete tmp;
    }
    else{
        SlNode* tmp = head;
        info = head->getId();
        head = head->next;
        delete tmp;
    }
    return info;
}
int SlList::deleteFromTail()
{
    int info;
    //test if we have empty list
    if(tail == 0)
    {
        std::cout << "Empty Linked List" << std::endl;
        return -1;
    }
    if(head == tail)
    {
        SlNode* tmp = tail;
        info = tail->getId();
        tail = NULL;
        tail = NULL;
        delete tmp;
    }
    else{
        SlNode* tmp;
        for(tmp = head; tmp != NULL && !(tmp->next == tail); tmp = tmp->next);
        info = tail->getId();
        tmp->next = NULL;
        delete tail;
        tail = tmp;
    }
    return info;
}
int SlList::deleteNode(int id)
{
    int info = -1;
    //Need to keep pointers to the predecessor and successor
    if(head != 0)
    {
        if(head == tail)
        {
            if(head->getId() == id)
            {
                info = head->getId();
                delete head;
                head = tail = 0;
            }
        }
        SlNode *pred, *succ;
        //We already checked header
        for(pred=head, succ=head->next; succ->next != 0 && !(succ->getId() == id); pred = pred->next, succ = succ->next);
        if(succ != 0)
        {
            SlNode* tmp = succ;
            info = succ->getId();
            pred->next = succ->next;//But before deletion we need to check if successor was the tail we need to update tail because we checked the tail
            if(succ == tail)
                tail = pred;
            delete tmp;
        }
    }
    return info;
}
bool SlList::checkNode(int id) const
{
    //Check if this node exist in this list
    if(head == 0)
        return false;
    SlNode* tmp;
    for(tmp=head; tmp!= 0 && tmp->getId() == id; tmp = tmp->next);
    return tmp != 0;//If we reached the last element then the id doesn't exist in the list.
}

void SlList::printContent() const
{
    for(SlNode* tmp= head; tmp != 0; tmp=tmp->next)
        std::cout << tmp->getId() << std::endl;

}