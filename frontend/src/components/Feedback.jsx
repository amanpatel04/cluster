import Card from './ui/Card';
import Button from './ui/Button';
const Feedback = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/api/v1/feedback/set/', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Feedback submitted successfully!');
          event.target.reset();
        } else {
          alert(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again later.');
      });
  };

  return (
    <Card className='mx-auto mt-[calc(50vh-250px)] max-w-96 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'>
      <h1 className='mb-6 w-full text-center text-xl font-semibold'>
        Feedback
      </h1>

      <form
        className='flex flex-col gap-4'
        action=''
        method='POST'
        onSubmit={handleSubmit}
      >
        <textarea
          name='message'
          className='border-light-border dark:border-dark-border dark:bg-dark-bg-light bg-light-bg-light w-full rounded-lg border p-3 text-sm text-gray-700 dark:text-gray-300'
          placeholder='Write your feedback here...'
          required
        ></textarea>
        <br />
        <Button
          className={
            'border-light-border dark:border-dark-border mx-auto w-2/3 border'
          }
          variant='secondary'
          type='submit'
        >
          Submit Feedback
        </Button>
      </form>
      <p className='text-light-text-muted dark:text-dark-text-muted mt-4 text-center text-sm font-light'>
        Your feedback is important to us!
      </p>
    </Card>
  );
};

export default Feedback;
