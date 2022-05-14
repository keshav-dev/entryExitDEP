import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Progress from './Progress';

const FileUpload = () => {

    const [file,setFile] = useState ('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);
    
        try {
          const res = await axios.post('/api/admin/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
              setUploadPercentage(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            }
          });
          
          setTimeout(() => setUploadPercentage(0), 10000);
    
        //   const { fileName, filePath } = res.data;
    
        //   setUploadedFile({ fileName, filePath });
    
        //   setMessage('File Uploaded');
        } catch (err) {
        //   if (err.response.status === 500) {
        //     setMessage('There was a problem with the server');
        //   } else {
        //     setMessage(err.response.data.msg);
        //   }
          setUploadPercentage(0)
        }
      };

  return (
    <Fragment>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Upload Students</label>
                <input className="form-control" type="file" id="formFile" onChange={onChange}/>
            </div>
            <Progress percentage={uploadPercentage} />
            <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4'>
            </input>
            
        </form>
    </Fragment>
  )
}

export default FileUpload