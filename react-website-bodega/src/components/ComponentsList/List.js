import { createClass } from "react";
import ListItem from "./ListItem";
import ListHeader from "./ListHeader";
import EmptyList from "./EmptyList";

var List = createClass({
  getListOfItemIds: function (items) {
    return Object.keys(items);
  },

  getTotalNumberOfListItems: function (items) {
    var totalNumberOfItems = 0;
    var item;

    this.getListOfItemIds(items).forEach(function (itemId) {
      item = items[itemId];
      totalNumberOfItems = totalNumberOfItems + parseInt(item.quantity, 10);
    });

    return totalNumberOfItems;
  },

  createListItemElements: function (items) {
    var item;

    return this.getListOfItemIds(items)
      .map(
        function createListItemElement(itemId) {
          item = items[itemId];
          return (
            <ListItem
              item={item}
              removeListItem={this.props.removeListItem}
              key={item.id}
            />
          );
        }.bind(this)
      )
      .reverse();
  },

  render: function () {
    var items = this.props.items;
    var listItemElements = this.createListItemElements(items);

    return (
      <div>
        <h3 className="page-header">
          <ListHeader
            totalNumberOfListItems={this.getTotalNumberOfListItems(items)}
            removeAllListItems={this.props.removeAllListItems}
          />
        </h3>
        <ul>
          {listItemElements.length > 0 ? listItemElements : <EmptyList />}
        </ul>
      </div>
    );
  },
});

export default List;
