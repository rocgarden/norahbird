import classes from './notification.module.css';

function Notification(props) {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${classes.error}`;

  return (
    <div className={cssClasses}>
          <div>
              <h2>{title} </h2>
          </div> 
          <div>
              <p>{message}</p>
         </div>
    </div>
  );
}

export default Notification;