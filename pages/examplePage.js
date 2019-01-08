const Page = props => {

    return (
      <div>
        <h1>Page {props.query.page}</h1>
      </div>
    );
  };
  
  Page.getInitialProps = props => {
    return {query:props.query};
  };

  export default Page