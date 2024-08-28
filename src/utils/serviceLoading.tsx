import { Spin } from 'antd';
import ReactDOM from 'react-dom/client';

let httpRequestCount = 0;

export const showLoading = () => {
  if (httpRequestCount === 0) {
    const loadingContainer: HTMLDivElement = document.createElement('div');
    loadingContainer.setAttribute('id', 'serviceLoading');
    document.body.appendChild(loadingContainer);
    ReactDOM.createRoot(loadingContainer).render(
      <Spin tip="Loading...">
        <div
          style={{
            width: '100vw',
            height: '100vh',
          }}
        ></div>
      </Spin>,
    );
  }
  httpRequestCount++;
};
export const hideLoading = () => {
  httpRequestCount--;

  if (httpRequestCount === 0) {
    document.body.removeChild(document.querySelector('#serviceLoading') as HTMLDivElement);
  }
};
