# Practice 
please take a look at user-ui.png and do the following:
- with pseudo code and verbally, describe the UI
- then describe it in terms of api requests 
- then describe how reusable some components are


# Repetitions go here 

# Rep 25/5/25
- In terms of layout id say theres a top section for search, left side section for filters and then the remaining space for search results 
```html
  <div>
    <div id="search">
      
    </div>
    <div id="filters">
    </div>
    <div id="users">
    </div>
  </div>  
```


- Next focusing on the users section bc thats the most interesting one 
- Its made up of two sections, a header of sorts with a sorting filter and results 
- the results could be a list of cards which split in to 3 parts 
- profile image, details and actions/pricing
```html
  <div id="users">
    <div id="user-filter">
    </div>
    <div id="user-results">
      // some loop generation of user cards
      <div id="user" key="user-1">
        <div className="pfp-container">
          <img />  
        </div>
        <div className="details">
        </div>
        <div className="actions">
          <div className="pricing">
          </div>
          <div className="actions__buttons">
          </div>
        </div>
      <div>
    </div>
  </div>
```
- Id say i dont need to user the term 'user' within the user container


- Next is api structure 
- Search would receive the searchCriteria object and be able to modify it, triggering debounced searchs 
  - Save would save the search term for the user, probably to their account? 
- Users would receive the results of searchCriteria changing and also inital empty search on first load
  - Invite to bid would trigger confirmation and trigger an api call
  - Contact would would trigger confirmation and trigger an api call

- Reusable components 
  - User cards 
  - Debounced text input 
  - The stars component 
  - The horizontal skills list 