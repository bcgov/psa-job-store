import Quill from 'quill';
import 'quill-paste-smart';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

interface QuillEditorProps {
  readOnly?: boolean;
  value?: string;
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
}

const QuillEditor = forwardRef<Quill, QuillEditorProps>(
  ({ readOnly, value, onTextChange, onSelectionChange, onBlur }, ref) => {
    // const Delta = Quill.import('delta');
    const containerRef = useRef<HTMLDivElement | null>(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const quillInstanceRef = useRef<Quill | null>(null);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (typeof ref === 'object' && ref?.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    // Update content when value changes
    useEffect(() => {
      if (quillInstanceRef.current && value !== undefined) {
        const currentContent = quillInstanceRef.current.root.innerHTML;
        if (currentContent !== value) {
          quillInstanceRef.current.setText('');
          quillInstanceRef.current.clipboard.dangerouslyPasteHTML(0, value);
        }
      }
    }, [value]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));

      const quill_modules = {
        toolbar: [
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic'],
          ['link'],
          [{ indent: '+1' }, { indent: '-1' }],
        ],
        clipboard: true,
      };

      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: quill_modules,
      });

      if (ref) {
        (ref as any).current = quill;
      }
      quillInstanceRef.current = quill;

      if (value) {
        // quill.setText('');
        // quill.setContents(new Delta().insert(value));
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      quill.root.addEventListener('blur', (e: FocusEvent) => {
        onBlur?.(e as unknown as React.FocusEvent<HTMLDivElement>);
      });

      return () => {
        quill.root.removeEventListener('blur', (e: FocusEvent) => {
          onBlur?.(e as unknown as React.FocusEvent<HTMLDivElement>);
        });
        if (ref) {
          (ref as any).current = null;
        }
        quillInstanceRef.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
